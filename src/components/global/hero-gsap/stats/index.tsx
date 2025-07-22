import data from '@/config/stats.json';

export default function Stats() {
  const { stats } = data;

  return (
    <div className="grid grid-cols-3 gap-8 border-t border-border/50 pt-8">
      {stats.map((item, index) => (
        <div key={index}>
          <div className={item.value_classes}>{item.value}</div>
          <div className={item.label_classes}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}
