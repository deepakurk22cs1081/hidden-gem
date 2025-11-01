
import React, { useState, useRef, useEffect } from 'react';
// FIX: `LiveSession` is not an exported member of `@google/genai` and has been removed.
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { MicIcon } from './icons';
import { createBlob, decode, decodeAudioData } from '../utils/audioUtils';

const VoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Idle');
  // FIX: Replaced `LiveSession` with `any` as it is not an exported type.
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const sessionRef = useRef<any | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const stopAssistant = () => {
    setIsActive(false);
    setStatus('Idle');

    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }

    if(sourceRef.current && processorRef.current && audioContextRef.current) {
        sourceRef.current.disconnect(processorRef.current);
        processorRef.current.disconnect(audioContextRef.current.destination);
    }
    sourceRef.current = null;
    processorRef.current = null;

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    audioContextRef.current = null;
    
    if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
        outputAudioContextRef.current.close();
    }
    outputAudioContextRef.current = null;

    for (const source of sourcesRef.current.values()) {
        try { source.stop(); } catch (e) {}
    }
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    sessionPromiseRef.current = null;
  };

  const startAssistant = async () => {
    if (isActive) return;

    try {
      // FIX: Ensure API key is available before proceeding.
      if (!process.env.API_KEY) {
        setStatus('API Key missing');
        console.error("Gemini API key not found.");
        return;
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // FIX: Added `(window as any)` to handle `webkitAudioContext` for older browsers without causing a TypeScript error.
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = inputAudioContext;

      // FIX: Added `(window as any)` to handle `webkitAudioContext` for older browsers without causing a TypeScript error.
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      outputAudioContextRef.current = outputAudioContext;
      
      setStatus('Connecting...');
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: async () => {
            setStatus('Listening...');
            setIsActive(true);

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            sourceRef.current = inputAudioContext.createMediaStreamSource(stream);
            processorRef.current = inputAudioContext.createScriptProcessor(4096, 1, 1);

            processorRef.current.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromiseRef.current?.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            sourceRef.current.connect(processorRef.current);
            processorRef.current.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64EncodedAudioString =
              message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64EncodedAudioString && outputAudioContextRef.current) {
              const outputAudioContext = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(
                nextStartTimeRef.current,
                outputAudioContext.currentTime,
              );
              const audioBuffer = await decodeAudioData(
                decode(base64EncodedAudioString),
                outputAudioContext,
                24000,
                1,
              );
              const sourceNode = outputAudioContext.createBufferSource();
              sourceNode.buffer = audioBuffer;
              sourceNode.connect(outputAudioContext.destination);
              sourceNode.addEventListener('ended', () => {
                sourcesRef.current.delete(sourceNode);
              });

              sourceNode.start(nextStartTimeRef.current);
              nextStartTimeRef.current = nextStartTimeRef.current + audioBuffer.duration;
              sourcesRef.current.add(sourceNode);
            }

            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              for (const source of sourcesRef.current.values()) {
                try { source.stop(); } catch(e) {}
                sourcesRef.current.delete(source);
              }
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Voice assistant error:', e);
            setStatus('Error');
            stopAssistant();
          },
          onclose: () => {
            stopAssistant();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: 'You are a helpful food discovery assistant. Keep your answers concise and friendly.',
        },
      });
      sessionPromiseRef.current = sessionPromise;
      sessionRef.current = await sessionPromise;
      
    } catch (error) {
      console.error("Failed to start voice assistant:", error);
      setStatus('Failed to start');
      stopAssistant();
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAssistant();
    }
  }, []);

  const toggleAssistant = () => {
    if (isActive) {
      stopAssistant();
    } else {
      startAssistant();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center">
      <button
        onClick={toggleAssistant}
        className={`p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
          isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        }`}
        aria-label={isActive ? 'Stop voice assistant' : 'Start voice assistant'}
      >
        <MicIcon className="w-8 h-8 text-white" />
      </button>
      <p className="text-center text-xs mt-1 text-gray-600 dark:text-gray-300 bg-gray-100/50 dark:bg-gray-800/50 px-2 py-1 rounded">{status}</p>
    </div>
  );
};

export default VoiceAssistant;