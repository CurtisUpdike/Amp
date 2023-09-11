interface Props {
  iconName: string;
  ariaLabel: string;
  tooltipText: string;
  onClick(): void;
  disabled?: boolean;
}

const IconButton = (props: Props) => (
  <button
    className="material-icon"
    onClick={props.onClick}
    aria-label={props.ariaLabel}
    title={props.tooltipText}
    disabled={props.disabled ?? false}
  >
    <span aria-hidden="true">{props.iconName}</span>
  </button>
);

export default IconButton;
