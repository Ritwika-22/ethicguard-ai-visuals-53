
import { useState, useRef, ChangeEvent } from "react";
import { 
  Upload, 
  MessageSquare, 
  AlertTriangle, 
  Info, 
  Check, 
  X, 
  Facebook, 
  Twitter, 
  Instagram,
  LoaderCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

type ContentSource = "text" | "file" | "social";
type FeedbackType = "correct" | "incorrect" | null;
type RiskLevel = "low" | "medium" | "high";

interface AnalysisResult {
  decision: string;
  confidence: number;
  issues: {
    type: string;
    description: string;
    severity: RiskLevel;
  }[];
  alternative?: string;
}

const ShadowModeTester = () => {
  const [contentSource, setContentSource] = useState<ContentSource>("text");
  const [textInput, setTextInput] = useState("");
  const [socialInput, setSocialInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [userFeedback, setUserFeedback] = useState<FeedbackType>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload button click
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // You would normally upload or process the file here
    }
  };

  // Mock analysis function (in a real app, this would call an API)
  const analyzeContent = () => {
    if (
      (contentSource === "text" && !textInput) || 
      (contentSource === "file" && !fileName) ||
      (contentSource === "social" && !socialInput)
    ) {
      toast({
        title: "Input required",
        description: "Please provide content to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setUserFeedback(null);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock different results based on content
      let mockResult: AnalysisResult;
      
      if (contentSource === "text" && textInput.toLowerCase().includes("hate")) {
        // Example of detecting hate speech
        mockResult = {
          decision: "Reject",
          confidence: 0.89,
          issues: [
            {
              type: "Hate Speech",
              description: "Potential hateful language detected",
              severity: "high"
            }
          ],
          alternative: "Consider rephrasing your message in a more respectful manner."
        };
      } else if (contentSource === "social" && socialInput.toLowerCase().includes("fake")) {
        // Example of detecting fake news
        mockResult = {
          decision: "Flag for Review",
          confidence: 0.76,
          issues: [
            {
              type: "Misinformation",
              description: "Potential false information detected",
              severity: "medium"
            }
          ],
          alternative: "Consider adding credible sources to support your claims."
        };
      } else {
        // Default "safe" result
        mockResult = {
          decision: "Approve",
          confidence: 0.95,
          issues: [
            {
              type: "Bias Check",
              description: "No significant bias detected",
              severity: "low"
            }
          ]
        };
      }

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  // Handle user feedback
  const provideFeedback = (type: FeedbackType) => {
    setUserFeedback(type);
    toast({
      title: "Feedback Received",
      description: `Thank you for helping improve the AI model!`,
      duration: 3000,
    });
  };

  // Get color based on risk level
  const getRiskColor = (severity: RiskLevel) => {
    switch (severity) {
      case "high":
        return "text-shadow-error";
      case "medium":
        return "text-shadow-warning";
      case "low":
        return "text-shadow-success";
      default:
        return "text-shadow-secondary";
    }
  };

  // Get decision color
  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "Approve":
        return "text-shadow-success";
      case "Flag for Review":
        return "text-shadow-warning";
      case "Reject":
        return "text-shadow-error";
      default:
        return "text-shadow-secondary";
    }
  };

  return (
    <div className="min-h-screen bg-shadow-background text-shadow-foreground p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-ethic-green flex items-center">
            AI Shadow Mode Tester
          </h2>
          <p className="text-shadow-secondary mb-6">
            Test how AI would analyze your content without publishing it live. This helps identify potential issues before content goes public.
          </p>
          
          {/* Content Source Tabs */}
          <div className="flex border-b border-shadow-border mb-6">
            <button
              className={`px-4 py-2 ${contentSource === "text" ? "border-b-2 border-ethic-green text-ethic-green" : "text-shadow-secondary"}`}
              onClick={() => setContentSource("text")}
            >
              <MessageSquare className="inline mr-2 h-4 w-4" />
              Text Input
            </button>
            <button
              className={`px-4 py-2 ${contentSource === "file" ? "border-b-2 border-ethic-green text-ethic-green" : "text-shadow-secondary"}`}
              onClick={() => setContentSource("file")}
            >
              <Upload className="inline mr-2 h-4 w-4" />
              File Upload
            </button>
            <button
              className={`px-4 py-2 ${contentSource === "social" ? "border-b-2 border-ethic-green text-ethic-green" : "text-shadow-secondary"}`}
              onClick={() => setContentSource("social")}
            >
              <Facebook className="inline mr-2 h-4 w-4" />
              Social Media
            </button>
          </div>
          
          {/* Dynamic Input Section */}
          <div className="bg-shadow-card p-6 rounded-xl shadow-md mb-6 border border-shadow-border">
            {contentSource === "text" && (
              <div>
                <label className="block mb-2 font-medium">Enter text to analyze:</label>
                <Textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type or paste text here to analyze for potential issues..."
                  className="w-full h-32 bg-shadow-muted border-shadow-border text-shadow-foreground"
                />
              </div>
            )}
            
            {contentSource === "file" && (
              <div>
                <label className="block mb-2 font-medium">Upload image or document:</label>
                <div 
                  className="border-2 border-dashed border-shadow-border rounded-lg p-8 text-center cursor-pointer hover:bg-shadow-highlight transition-colors"
                  onClick={handleFileButtonClick}
                >
                  <Upload className="mx-auto h-12 w-12 text-shadow-secondary mb-2" />
                  <p className="text-shadow-secondary mb-2">
                    {fileName ? fileName : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-shadow-secondary">
                    Supports: JPG, PNG, PDF, DOC, TXT (max 10MB)
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                </div>
              </div>
            )}
            
            {contentSource === "social" && (
              <div>
                <label className="block mb-2 font-medium">Paste social media content:</label>
                <div className="mb-4 flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-shadow-border text-shadow-secondary"
                  >
                    <Facebook className="mr-1 h-4 w-4" />
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-shadow-border text-shadow-secondary"
                  >
                    <Twitter className="mr-1 h-4 w-4" />
                    Twitter
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-shadow-border text-shadow-secondary"
                  >
                    <Instagram className="mr-1 h-4 w-4" />
                    Instagram
                  </Button>
                </div>
                <Textarea
                  value={socialInput}
                  onChange={(e) => setSocialInput(e.target.value)}
                  placeholder="Paste a post, tweet, or comment here to analyze..."
                  className="w-full h-32 bg-shadow-muted border-shadow-border text-shadow-foreground"
                />
              </div>
            )}
            
            {/* Analyze Button */}
            <div className="mt-4">
              <Button 
                onClick={analyzeContent} 
                disabled={isAnalyzing}
                className="bg-ethic-navy hover:bg-ethic-navy/90 text-white w-full md:w-auto"
              >
                {isAnalyzing ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Preview AI Decision
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Analysis Results */}
          {analysisResult && (
            <div className="bg-shadow-card p-6 rounded-xl shadow-md border border-shadow-border animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">AI Decision Preview</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Info className="h-4 w-4 text-shadow-secondary" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      This shows how AI would evaluate this content in a live environment.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              {/* Decision */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-shadow-secondary mr-2">Decision:</span>
                  <span className={`font-bold text-lg ${getDecisionColor(analysisResult.decision)}`}>
                    {analysisResult.decision}
                  </span>
                  <span className="ml-2 text-xs text-shadow-secondary">
                    ({Math.round(analysisResult.confidence * 100)}% confidence)
                  </span>
                </div>
                
                {/* Issues Detected */}
                <div className="bg-shadow-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Issues Detected:</h4>
                  <ul className="space-y-3">
                    {analysisResult.issues.map((issue, index) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className={`h-5 w-5 mr-2 mt-0.5 ${getRiskColor(issue.severity)}`} />
                        <div>
                          <div className="font-medium">
                            {issue.type}
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              issue.severity === "high" ? "bg-shadow-error/20 text-shadow-error" :
                              issue.severity === "medium" ? "bg-shadow-warning/20 text-shadow-warning" :
                              "bg-shadow-success/20 text-shadow-success"
                            }`}>
                              {issue.severity} severity
                            </span>
                          </div>
                          <p className="text-sm text-shadow-secondary">{issue.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Suggested Alternative */}
                {analysisResult.alternative && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Suggested Improvement:</h4>
                    <p className="text-sm bg-shadow-highlight p-3 rounded-lg border-l-4 border-ethic-green">
                      {analysisResult.alternative}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Feedback Controls */}
              <div className="mt-6 border-t border-shadow-border pt-4">
                <h4 className="font-medium mb-3">Is this analysis correct?</h4>
                <div className="flex space-x-3">
                  <Button
                    variant={userFeedback === "correct" ? "default" : "outline"}
                    size="sm"
                    onClick={() => provideFeedback("correct")}
                    className={userFeedback === "correct" ? "bg-shadow-success text-white" : "border-shadow-border"}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Correct
                  </Button>
                  <Button
                    variant={userFeedback === "incorrect" ? "default" : "outline"}
                    size="sm"
                    onClick={() => provideFeedback("incorrect")}
                    className={userFeedback === "incorrect" ? "bg-shadow-error text-white" : "border-shadow-border"}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Incorrect
                  </Button>
                </div>
                <p className="text-xs text-shadow-secondary mt-2">
                  Your feedback helps improve the AI model's accuracy.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShadowModeTester;
