export interface LoadingState {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}