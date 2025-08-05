import { Button } from '@components/ui/Button';
import { Environments } from '@/interface/models';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@components/ui/Dialog';
import { Component, createContext, useContext, useState } from 'react';

interface ErrorManagerContextProps {
  errors: Error[];
  pushError: (error: Error) => void;
  removeError: (index: number) => void;
  clearAllErrors: () => void;
  setError: (error: Error) => void;
  clearError: () => void;
}

const ErrorManagerContext = createContext<ErrorManagerContextProps | undefined>(undefined);

export const ErrorBoundary = class extends Component<{ children: React.ReactNode }, { error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
  }
  
  render() {
    return this.props.children;
  }
};

export const ErrorManagerProvider: React.FC<{ environment: Environments, children: React.ReactNode }> = ({ environment, children }) => {
  const [errors, setErrors] = useState<Error[]>([]);
  
  const pushError = (error: Error) => {
    setErrors(prev => [...prev, error]);
  };

  const removeError = (index: number) => {
    setErrors(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllErrors = () => {
    setErrors([]);
  };

  const setError = pushError;
  const clearError = () => {
    if (errors.length > 0) {
      removeError(errors.length - 1);
    }
  };

  const lastError = errors.length > 0 ? errors[errors.length - 1] : null;

  const allowEnvs = ['debug'];

  return (
    <ErrorManagerContext.Provider 
      value={{ 
        errors,
        pushError,
        removeError,
        clearAllErrors,
        setError, 
        clearError 
      }}
    >
      {
        allowEnvs.includes(environment) ? (
          <>
            <ErrorBoundary>{children}</ErrorBoundary>

            <Dialog 
              open={errors.length > 0} 
              onOpenChange={(open) => {
                if (!open) clearError();
              }}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Se ha producido un error</DialogTitle>
                  <DialogDescription>
                    {lastError?.message.startsWith('<') ? (
                      <div dangerouslySetInnerHTML={{ __html: lastError.message }} />
                    ) : (
                      <pre className="overflow-auto text-xs">{JSON.stringify(lastError, null, 2)}</pre>
                    )}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={clearError}>Cerrar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        ) : children
      }
    </ErrorManagerContext.Provider>
  );
};

export const useErrorManager = () => {
  const ctx = useContext(ErrorManagerContext);
  if (!ctx) throw new Error('useErrorManager debe usarse dentro de <ErrorManagerProvider>');
  return ctx;
};

export const useErrorStack = () => {
  const ctx = useErrorManager();
  return ctx.errors;
};
