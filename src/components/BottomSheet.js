import React, { useState, useRef, useEffect, useCallback } from 'react';
import './BottomSheet.css';

const BottomSheet = ({ children, position, setPosition }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef(null);

  const snapPoints = {
    closed: 50,
    half: window.innerHeight * 0.5,
    full: window.innerHeight * 0.9,
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientY = e.clientY ?? e.touches[0].clientY;
    setStartY(clientY);
    setCurrentY(clientY);
    e.preventDefault();
  };

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;
    const clientY = e.clientY ?? (e.touches ? e.touches[0].clientY : currentY);
    setCurrentY(clientY);
  }, [isDragging, currentY]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const currentHeight = window.innerHeight - currentY;
    let closestSnap = position;
    let minDiff = Infinity;

    Object.entries(snapPoints).forEach(([key, value]) => {
      const diff = Math.abs(currentHeight - value);
      if (diff < minDiff && diff > 10) {
        minDiff = diff;
        closestSnap = key;
      }
    });

    if (currentHeight < snapPoints.closed + 20) {
      closestSnap = 'closed';
    }

    setPosition(closestSnap);
  }, [isDragging, currentY, position, snapPoints]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const getSheetHeight = () => {
    if (isDragging) {
      const height = window.innerHeight - currentY;
      return Math.max(snapPoints.closed, Math.min(height, snapPoints.full));
    }
    return snapPoints[position];
  };

  return (
    <>
      {position !== 'closed' && (
        <div className="backdrop" onClick={() => setPosition('closed')} />
      )}

      <div
        ref={sheetRef}
        className={`bottom-sheet ${position}`}
        style={{
          height: `${getSheetHeight()}px`,
          transition: isDragging ? 'none' : 'height 0.3s cubic-bezier(0.2, 0, 0, 1)',
        }}
      >
        <div 
          className="handle"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className="handle-icon" />
        </div>

        <div className="content">
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;