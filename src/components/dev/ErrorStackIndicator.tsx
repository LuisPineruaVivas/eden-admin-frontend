import { Environments } from "@interfaces/models";
import { useErrorStack } from "@config/providers/ErrorManagerProvider";

interface IErrorStackIndicator {
  environment: Environments
}

export const ErrorStackIndicator = ({ environment }: IErrorStackIndicator) => {
  const errors = useErrorStack();

  const allowEnvs = ['development', 'debug'];

  if (errors.length === 0) {
    return null;
  }

  return (
    allowEnvs.includes(environment) ? (
      <div className='fixed bottom-4 right-4 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg z-50'>
        {errors.length}
      </div>
    ) : <></>
  );
};