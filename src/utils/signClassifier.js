/**
 * Hand Gesture Classifier Engine (ISL / ASL)
 * Evaluates 21 landmark points (x, y, z) from MediaPipe Hands
 * Supports ISL alphabet + common ISL words
 */

// Utility: euclidean distance between two landmarks
function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function classifyHandGesture(landmarks) {
  if (!landmarks || landmarks.length < 21) {
    return { detected: null, confidence: 0, reason: 'No hand detected' };
  }

  // Key landmark indices (MediaPipe Hands model):
  // 0: WRIST
  // 4: THUMB_TIP,  3: THUMB_IP,  2: THUMB_MCP,  1: THUMB_CMC
  // 8: INDEX_TIP,  7: INDEX_DIP, 6: INDEX_PIP,  5: INDEX_MCP
  // 12: MIDDLE_TIP,11:MIDDLE_DIP,10:MIDDLE_PIP,  9: MIDDLE_MCP
  // 16: RING_TIP,  15:RING_DIP, 14: RING_PIP,  13: RING_MCP
  // 20: PINKY_TIP, 19:PINKY_DIP,18: PINKY_PIP, 17: PINKY_MCP

  const wrist = landmarks[0];

  // ── Finger extension checks (tip.y < pip.y → finger is UP in screen coords) ──
  const isIndexExtended  = landmarks[8].y  < landmarks[6].y;
  const isMiddleExtended = landmarks[12].y < landmarks[10].y;
  const isRingExtended   = landmarks[16].y < landmarks[14].y;
  const isPinkyExtended  = landmarks[20].y < landmarks[18].y;

  // Thumb extended: tip far from index MCP, or tip above IP joint
  const thumbTip   = landmarks[4];
  const indexMcp   = landmarks[5];
  const thumbDistFromIndex = dist(thumbTip, indexMcp);
  const isThumbExtended = thumbDistFromIndex > 0.15 || thumbTip.y < landmarks[3].y;

  // Key distances
  const thumbIndexDist  = dist(landmarks[4], landmarks[8]);
  const thumbMiddleDist = dist(landmarks[4], landmarks[12]);
  const thumbPinkyDist  = dist(landmarks[4], landmarks[20]);
  const indexMiddleDist = dist(landmarks[8], landmarks[12]);
  const indexRingDist   = dist(landmarks[8], landmarks[16]);

  // Curl depth (tip.y relative to wrist.y — higher value = more curled)
  const indexCurl  = landmarks[8].y  - wrist.y;
  const middleCurl = landmarks[12].y - wrist.y;
  const ringCurl   = landmarks[16].y - wrist.y;

  let detected   = null;
  let confidence = 0.85;

  // ══════════════════════════════════════════════════════════════
  // ISL / ASL Gesture Classification Rules
  // ══════════════════════════════════════════════════════════════

  // 1. OPEN PALM / HELLO (all 5 fingers fully extended + spread)
  if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && isThumbExtended) {
    if (indexMiddleDist > 0.07 || thumbIndexDist > 0.2) {
      detected = { char: 'Hello', name: 'Open Palm / Namaste', category: 'Greeting', emoji: '✋' };
      confidence = 0.97;
    }
  }

  // 2. LETTER B (all 4 fingers up, thumb tucked/closed)
  else if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && !isThumbExtended) {
    detected = { char: 'B', name: 'Letter B', category: 'Alphabet', emoji: '🤚' };
    confidence = 0.93;
  }

  // 3. VICTORY / V / PEACE (index + middle up, spread)
  else if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended) {
    if (indexMiddleDist > 0.08) {
      detected = { char: 'V', name: 'Letter V / Peace / Victory', category: 'Alphabet', emoji: '✌️' };
      confidence = 0.96;
    } else {
      // U: index + middle together
      detected = { char: 'U', name: 'Letter U (fingers together)', category: 'Alphabet', emoji: '🤞' };
      confidence = 0.92;
    }
  }

  // 4. LETTER L (index up + thumb out horizontal)
  else if (isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && isThumbExtended) {
    detected = { char: 'L', name: 'Letter L', category: 'Alphabet', emoji: '👆' };
    confidence = 0.95;
  }

  // 5. LETTER D / pointing / Number 1 (index up, no thumb)
  else if (isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && !isThumbExtended) {
    detected = { char: 'D', name: 'Letter D / Pointing / One', category: 'Alphabet', emoji: '☝️' };
    confidence = 0.94;
  }

  // 6. LETTER W (index, middle, ring up; pinky & thumb down)
  else if (isIndexExtended && isMiddleExtended && isRingExtended && !isPinkyExtended && !isThumbExtended) {
    detected = { char: 'W', name: 'Letter W', category: 'Alphabet', emoji: '🖖' };
    confidence = 0.94;
  }

  // 7. LETTER Y / SHAKA (thumb + pinky out, middle 3 down)
  else if (!isIndexExtended && !isMiddleExtended && !isRingExtended && isPinkyExtended && isThumbExtended) {
    detected = { char: 'Y', name: 'Letter Y / Shaka / Call Me', category: 'Alphabet', emoji: '🤙' };
    confidence = 0.97;
  }

  // 8. LETTER I (pinky up alone, no thumb)
  else if (!isIndexExtended && !isMiddleExtended && !isRingExtended && isPinkyExtended && !isThumbExtended) {
    detected = { char: 'I', name: 'Letter I', category: 'Alphabet', emoji: '🤞' };
    confidence = 0.95;
  }

  // 9. LETTER F / OK (thumb + index pinch, middle+ring+pinky extended)
  else if (thumbIndexDist < 0.07 && isMiddleExtended && isRingExtended && isPinkyExtended) {
    detected = { char: 'F', name: 'Letter F / OK Sign', category: 'Alphabet', emoji: '👌' };
    confidence = 0.96;
  }

  // 10. LETTER K (index + middle up, thumb touching middle, spread apart)
  else if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended && thumbMiddleDist < 0.1) {
    detected = { char: 'K', name: 'Letter K', category: 'Alphabet', emoji: '✌️' };
    confidence = 0.90;
  }

  // 11. LETTER R (index + middle crossed/together, ring + pinky down)
  else if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended && indexMiddleDist < 0.05) {
    detected = { char: 'R', name: 'Letter R (fingers crossed)', category: 'Alphabet', emoji: '🤞' };
    confidence = 0.91;
  }

  // 12. LETTER O (thumb + index form circle, others slightly curled)
  else if (thumbIndexDist < 0.08 && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
    detected = { char: 'O', name: 'Letter O / Zero', category: 'Alphabet', emoji: '👌' };
    confidence = 0.93;
  }

  // 13. LETTER C (curved open hand — thumb + index form C shape, medium distance)
  else if (thumbIndexDist > 0.09 && thumbIndexDist < 0.22 && !isIndexExtended && !isPinkyExtended) {
    detected = { char: 'C', name: 'Letter C (curved hand)', category: 'Alphabet', emoji: '🤏' };
    confidence = 0.87;
  }

  // 14. THUMBS UP / YES / GOOD (all fingers curled, thumb pointing up)
  else if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && isThumbExtended) {
    if (thumbTip.y < wrist.y) {
      detected = { char: 'YES', name: 'Thumbs Up / Yes / Good', category: 'ISL Word', emoji: '👍' };
      confidence = 0.94;
    } else {
      detected = { char: 'A', name: 'Letter A (fist with thumb)', category: 'Alphabet', emoji: '✊' };
      confidence = 0.91;
    }
  }

  // 15. LETTER E / CLOSED FIST / NO (all fingers curled, no thumb)
  else if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && !isThumbExtended) {
    detected = { char: 'E', name: 'Letter E / Fist / Stop', category: 'Alphabet', emoji: '✊' };
    confidence = 0.88;
  }

  // 16. LETTER S (fist with thumb wrapped over fingers)
  else if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended
    && thumbTip.x > landmarks[2].x && thumbTip.x < landmarks[5].x) {
    detected = { char: 'S', name: 'Letter S (thumb over fist)', category: 'Alphabet', emoji: '✊' };
    confidence = 0.88;
  }

  // 17. LETTER N (index + middle over ring)
  else if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended
    && thumbIndexDist < 0.15 && indexRingDist < 0.1) {
    detected = { char: 'N', name: 'Letter N', category: 'Alphabet', emoji: '✌️' };
    confidence = 0.88;
  }

  // 18. LETTER M (ring + middle + index tucked under thumb)
  else if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended
    && !isThumbExtended && thumbTip.y > landmarks[8].y) {
    detected = { char: 'M', name: 'Letter M', category: 'Alphabet', emoji: '✊' };
    confidence = 0.86;
  }

  return {
    detected,
    confidence: detected ? confidence : 0,
    activeFingers: {
      thumb:  isThumbExtended,
      index:  isIndexExtended,
      middle: isMiddleExtended,
      ring:   isRingExtended,
      pinky:  isPinkyExtended
    }
  };
}

/**
 * Returns a display-friendly label for a detected sign result
 */
export function getSignLabel(result) {
  if (!result || !result.detected) return null;
  const { char, name, emoji } = result.detected;
  return { char, name, emoji, confidence: result.confidence };
}
