export default function NutritionBadge({ calories, macros }) {
  const items = [
    { label: 'kcal', value: calories, color: 'var(--color-primary)' },
    { label: 'protein', value: `${macros.protein}g`, color: 'var(--color-accent)' },
    { label: 'carbs', value: `${macros.carbs}g`, color: 'var(--color-warning)' },
    { label: 'fat', value: `${macros.fat}g`, color: 'var(--color-accent-2)' },
  ];
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {items.map(item => (
        <div key={item.label} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: 'var(--color-surface-2)',
          borderRadius: 'var(--radius-xs)',
          padding: '6px 10px',
          minWidth: 52,
          border: '1px solid var(--color-border)',
        }}>
          <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: item.color }}>{item.value}</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
