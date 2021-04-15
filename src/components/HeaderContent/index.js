import React from 'react';
import styles from './index.less';
import { Space, Button } from 'antd';

export default function (props) {
  return (
    <div className={styles.globalHeader}>
      <Space>
        <Button type="primary">胜多负少</Button>
        <Button>胜多负少</Button>
        <Button>胜多负少</Button>
        <Button>胜多负少</Button>
      </Space>
    </div>
  );
}
