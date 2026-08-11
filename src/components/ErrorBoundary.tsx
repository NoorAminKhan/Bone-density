import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught app error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="glass-panel p-8 rounded-2xl max-w-md w-full border border-cyan-500/30">
            <h2 className="text-xl font-bold text-cyan-400 mb-2">Exhibit Display Notice</h2>
            <p className="text-slate-300 text-sm mb-6">
              An unexpected system message was intercepted. The museum kiosk remains fully operational.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Resume Kiosk
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
