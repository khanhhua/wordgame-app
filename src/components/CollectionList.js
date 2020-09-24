import React from 'react';

export default ({ collections, onReviewClick, onEditClick }) => {
  const editable = typeof onEditClick === 'function';

  return (
    <div className="list-group list-group-flush">
      {collections.map((item) => (
        <div key={item.get('id')} className="list-group-item px-1">
          {item.get('name')}
          <div className="actions float-right">
            <div className="btn-group btn-group-sm">
              {editable && (
                <button
                  className="btn btn-sm btn-light"
                  onClick={() => onEditClick(item)}
                >
                  Edit
                </button>
              )}
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onReviewClick(item)}
              >
                Review
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
