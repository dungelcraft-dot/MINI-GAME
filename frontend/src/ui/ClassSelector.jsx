export function ClassSelector({ classes, selectedClass, onChange }) {
  return (
    <label>
      Clase
      <select value={selectedClass} onChange={(e) => onChange(e.target.value)}>
        {classes.map((klass) => (
          <option key={klass} value={klass}>
            {klass}
          </option>
        ))}
      </select>
    </label>
  );
}
