import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Download as DownloadIcon,
  FileText,
  CheckCircle,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/Card";
import Button from "../components/Button";
import StepIndicator from "../components/StepIndicator";
import { useConversionStore } from "../hooks/useConversionStore";
import { downloadFile } from "../services/api";

const Download = () => {
  const { file, uploadId, reset } = useConversionStore();

  const handleDownload = async () => {
    if (uploadId) {
      await downloadFile(uploadId);
      toast.success(
        "Download ready! Your AI-converted presentation is downloading."
      );
    } else {
      toast.error("No file available for download.");
    }
  };

  const handleNewConversion = () => {
    reset();
    toast.success("Ready for a new conversion!");
  };

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <StepIndicator currentStep={3} />

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-success-100 dark:bg-success-900 rounded-2xl mb-4"
          >
            <CheckCircle className="h-8 w-8 text-success-600" />
          </motion.div>
          <h1 className="text-3xl font-bold font-heading text-secondary-900 dark:text-white mb-2">
            AI Conversion Complete!
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Your PowerPoint presentation has been created with AI precision
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-accent-500" />
              <span>Download Your AI-Generated File</span>
            </CardTitle>
            <CardDescription>
              Your PDF has been successfully converted using advanced AI
              technology
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* File Info */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-4 p-4 bg-success-50 dark:bg-success-950 border border-success-200 dark:border-success-800 rounded-xl"
            >
              <div className="p-3 bg-success-100 dark:bg-success-900 rounded-lg">
                <FileText className="h-6 w-6 text-success-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-success-900 dark:text-success-100">
                  {file?.name?.replace(".pdf", ".pptx") ||
                    "ai-converted-presentation.pptx"}
                </h4>
                <p className="text-sm text-success-600 dark:text-success-400">
                  AI-Enhanced PowerPoint • Ready to download
                </p>
              </div>
            </motion.div>

            {/* AI Enhancement Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border-2 border-dashed border-primary-300 dark:border-primary-600 rounded-xl p-8 text-center bg-primary-50/50 dark:bg-primary-950/50"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl mb-4">
                <Sparkles className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="font-medium text-secondary-900 dark:text-white mb-2">
                AI-Enhanced Presentation
              </h4>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Your presentation has been optimized with intelligent layout
                recognition, perfect text extraction, and enhanced formatting
              </p>
            </motion.div>

            {/* AI Conversion Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-secondary-50 dark:bg-secondary-800 rounded-xl p-4"
            >
              <h4 className="font-medium text-secondary-900 dark:text-white mb-3 flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success-500" />
                <span>AI Conversion Summary</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">
                    Original format:
                  </span>
                  <span className="font-medium text-secondary-900 dark:text-white">
                    PDF
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">
                    Output format:
                  </span>
                  <span className="font-medium text-secondary-900 dark:text-white">
                    PowerPoint (.pptx)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">
                    AI processing time:
                  </span>
                  <span className="font-medium text-secondary-900 dark:text-white">
                    45 seconds
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">
                    Quality enhancement:
                  </span>
                  <span className="font-medium text-accent-600">
                    AI-Optimized
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">
                    Status:
                  </span>
                  <span className="font-medium text-success-600">
                    Completed
                  </span>
                </div>
              </div>
            </motion.div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleDownload} className="flex-1 group" size="lg">
              <DownloadIcon className="mr-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
              Download AI-Enhanced PowerPoint
            </Button>
            <div className="flex gap-3 flex-1 sm:flex-initial">
              <Link to="/upload" className="flex-1 sm:flex-initial">
                <Button
                  variant="outline"
                  onClick={handleNewConversion}
                  className="w-full group"
                >
                  <RotateCcw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                  Convert Another
                </Button>
              </Link>
              <Link to="/" className="flex-1 sm:flex-initial">
                <Button variant="secondary" className="w-full">
                  Home
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Download;
