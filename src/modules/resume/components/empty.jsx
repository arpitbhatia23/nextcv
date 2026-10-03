const EmptyState = ({ icon: Icon, title, body, action }) => (
  <div
    className="text-center py-24 rounded-2xl border"
    style={{ borderStyle: "dashed", borderColor: "#C8CDD9", backgroundColor: "#F8F7F3" }}
  >
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
      style={{ backgroundColor: "#EEF0F7", color: "#465B9E" }}
    >
      <Icon className="w-7 h-7" strokeWidth={1.5} />
    </div>
    <h3 className="font-display text-lg font-medium mb-2" style={{ color: "#17201C" }}>
      {title}
    </h3>
    <p className="text-sm max-w-sm mx-auto mb-6 leading-relaxed" style={{ color: "#5B625C" }}>
      {body}
    </p>
    {action}
  </div>
);

export default EmptyState;
