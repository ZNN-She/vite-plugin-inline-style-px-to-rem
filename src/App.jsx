import React from 'react'
import styles from './App.module.less';

function pxToRem(px) {
  return px / 16 + "rem"
}
function App() {
  return (
    <div className={styles['app']} style={{background: 'red', height: 16, width: 16, fontSize: "16px", margin: pxToRem(10)}}>
      147258369
    </div>
  )
}

export default App
