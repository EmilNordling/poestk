type Disposer = () => void;

export function addDashboardStyle(): Disposer {
  document.documentElement.classList.add('dashBoard');

  return () => {
    document.documentElement.classList.remove('dashBoard');
  };
}
