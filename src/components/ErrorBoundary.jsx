import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark flex items-center justify-center p-4 text-center">
          <div className="bg-dark-card border border-red-500/30 p-8 rounded-3xl max-w-lg w-full">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-6">The application crashed due to a runtime error.</p>
            <div className="bg-black/40 p-4 rounded-xl text-left mb-6 overflow-auto max-h-40">
              <code className="text-xs text-red-400">{this.state.error?.toString()}</code>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-white font-bold rounded-xl"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
