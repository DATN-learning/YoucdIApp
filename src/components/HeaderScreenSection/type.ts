export interface IHeaderScreenProps {
  label?: string;
  onPressGoBack?: () => void;
  isViewHeader?: boolean;
  viewComponent?: React.ReactNode;
}
