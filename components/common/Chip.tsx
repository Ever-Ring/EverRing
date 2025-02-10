interface ChipProps {
  label: string;
}

export default function Chip({ label }: ChipProps) {
  return <button>{label}</button>;
}
