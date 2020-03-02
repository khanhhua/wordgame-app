import React from 'react';

export default ({ collections, onReviewClick }) => (
  <div className="list-group list-group-flush">
    {collections.map(item => (
    <div key={item.get('id')} className="list-group-item px-1">
      {item.get('name')}
      <div className="actions float-right">
        <div className="btn-group btn-group-sm">
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
