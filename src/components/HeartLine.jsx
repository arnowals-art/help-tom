// De hartlijn: het signatuurelement van de site.
// Een subtiele ECG-lijn waar langzaam een gouden puls doorheen loopt —
// symbool voor Toms vechtende hart én de hoop van zijn familie.

const ECG_PATH =
  'M0,60 h100 l10,-10 l10,10 h22 l14,-42 l16,80 l14,-38 h22 l12,-12 l12,12 h150 ' +
  'l10,-10 l10,10 h22 l14,-42 l16,80 l14,-38 h22 l12,-12 l12,12 h150 ' +
  'l10,-10 l10,10 h22 l14,-42 l16,80 l14,-38 h22 l12,-12 l12,12 h160'

export default function HeartLine({ color = '#E8A020', className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      width="100%"
      height="70"
      aria-hidden="true"
      style={{ color, display: 'block' }}
    >
      {/* De vaste, zachte lijn */}
      <path
        className="heartline-base"
        d={ECG_PATH}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* De reizende gouden puls */}
      <path
        className="heartline-pulse"
        d={ECG_PATH}
        pathLength="1000"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
