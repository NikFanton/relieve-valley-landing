import React, { useState, useRef, useEffect } from 'react';
import { Upload, Wand2, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { generateDogVariant, generateInitialCharacter } from '../services/geminiService';

export const MascotShowcase: React.FC = () => {
  // We'll start with a placeholder, but allow the user to generate/upload
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePose, setActivePose] = useState<string>('Happy');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load an initial character if none exists
  useEffect(() => {
    const loadInitial = async () => {
        // Only load if we don't have one. 
        // We use a placeholder logic or generate one on the fly for the demo.
        // For speed in this demo, we might want a static placeholder, 
        // but let's try to generate one to show off the API if the user has a key.
        // If not, we fall back to a placeholder URL.
        if (process.env.API_KEY && !baseImage) {
             // Optional: Auto-generate on mount. 
             // For now, let's just use a placeholder to avoid consuming quota immediately on page load
             // without user interaction.
             setBaseImage("https://picsum.photos/seed/pup/400/400"); 
        }
    }
    loadInitial();
  }, []);


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBaseImage(reader.result as string);
        setGeneratedImage(null); // Reset generated when new base is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePose = async (pose: string) => {
    if (!baseImage) return;
    
    setIsGenerating(true);
    setActivePose(pose);
    
    let prompt = "";
    switch(pose) {
        case 'Meditating':
            prompt = "The dog is sitting in a lotus yoga position, eyes closed, looking very zen and peaceful";
            break;
        case 'Waving':
            prompt = "The dog is standing on hind legs waving one paw friendly at the viewer, smiling";
            break;
        case 'Sleeping':
            prompt = "The dog is curled up sleeping comfortably, maybe with a small snot bubble";
            break;
        default:
            prompt = "The dog is looking happy";
    }

    const result = await generateDogVariant(baseImage, prompt);
    
    if (result.imageUrl) {
      setGeneratedImage(result.imageUrl);
    } else {
      alert("Failed to generate image. Please check API key.");
    }
    setIsGenerating(false);
  };

  const poses = [
    { name: 'Meditating', icon: <Sparkles size={18} /> },
    { name: 'Waving', icon: <Wand2 size={18} /> },
    { name: 'Sleeping', icon: <Loader2 size={18} /> },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl border-4 border-brand-dark shadow-cartoon max-w-4xl mx-auto my-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-cartoon font-bold text-brand-dark mb-2">Meet Your Companion</h2>
        <p className="text-gray-600 font-body">Upload your pup (or use our mascot) and see them come to life in the valley!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        
        {/* Input Side */}
        <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-yellow-50 rounded-2xl border-2 border-dashed border-brand-dark flex flex-col items-center justify-center overflow-hidden group hover:bg-yellow-100 transition-colors">
                {baseImage ? (
                    <img src={baseImage} alt="Base mascot" className="w-full h-full object-cover" />
                ) : (
                    <div className="text-center p-6 text-gray-400">
                        <Upload className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No mascot yet</p>
                    </div>
                )}
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button size="sm" onClick={() => fileInputRef.current?.click()} variant="secondary">
                        <Upload size={16} /> Upload Photo
                     </Button>
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept="image/*" 
                    className="hidden" 
                />
            </div>
            <p className="text-xs text-center text-gray-400">
                Tip: Use a clear photo of a dog for best results!
            </p>
        </div>

        {/* Action Side */}
        <div className="flex flex-col gap-6">
            <div className="bg-brand-blue/10 p-6 rounded-2xl border-2 border-brand-blue/30">
                <h3 className="font-cartoon text-xl mb-4 text-brand-dark">Choose an Action:</h3>
                <div className="flex flex-wrap gap-3">
                    {poses.map((pose) => (
                        <Button 
                            key={pose.name} 
                            onClick={() => handleGeneratePose(pose.name)}
                            disabled={!baseImage || isGenerating}
                            variant={activePose === pose.name ? 'primary' : 'accent'}
                            className="flex-1 min-w-[120px]"
                        >
                            {isGenerating && activePose === pose.name ? <Loader2 className="animate-spin" /> : pose.icon}
                            {pose.name}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Output Display */}
            <div className="aspect-square bg-white rounded-2xl border-4 border-brand-dark shadow-cartoon relative flex items-center justify-center overflow-hidden">
                {isGenerating ? (
                    <div className="flex flex-col items-center gap-4 animate-pulse">
                        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
                        <span className="font-cartoon text-brand-orange">Creating Magic...</span>
                    </div>
                ) : generatedImage ? (
                    <img src={generatedImage} alt="Generated Pose" className="w-full h-full object-cover" />
                ) : (
                    <div className="text-gray-300 font-cartoon text-center px-8">
                        Select a pose to see the magic happen!
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};