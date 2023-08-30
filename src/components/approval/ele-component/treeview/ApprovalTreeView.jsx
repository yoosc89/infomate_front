import React from "react";
import styles from "./TreeView.module.css";
import tableStyle from '../table/ApprovalTable.module.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Tree,
} from "@minoru/react-dnd-treeview";
import {SelectCustomNode} from "./nodes/SelectCustomNode";
import {CustomDragPreview} from "./CustomDragPreview";
import {contextMappings} from "../../../../context/contextMappings";


function ApprovalTreeView({modalData, contextType}) {

  const selectedContext = contextMappings[contextType]();
  const { data, setData } = selectedContext;
  const { approvalList } = data;

  console.log(modalData)
  const handleSelect = (node) => {
    const item = approvalList.find((n) => n.id === node.id);

    if (!item) {
      setData(prev => ({...prev, approvalList:([...prev.approvalList, node])}))
      console.log(approvalList)
    } else {
      setData(prev=> ({...prev, approvalList:approvalList.filter((n) => n.id !== node.id)}))
    }
  };

  const handleClick= (index) => {
      const updatedList = [...approvalList];
      updatedList.splice(index, 1);
      setData(prev => ({...prev, approvalList:updatedList}));
  }


  return (
        <div className={styles.app}>

          <Tree
              tree={modalData}
              rootId={0}
              render={(node, { depth, isOpen, onToggle }) => (
                  <SelectCustomNode
                      node={node}
                      depth={depth}
                      isOpen={isOpen}
                      isSelected={!!approvalList.find((n) => n.id === node.id)}
                      canDrop={()=> false}
                      onToggle={onToggle}
                      onSelect={handleSelect}
                  />
              )}
              dragPreviewRender={(monitorProps) => (
                  <CustomDragPreview monitorProps={monitorProps} />
              )}
              classes={{
                draggingSource: styles.draggingSource,
                dropTarget: styles.dropTarget
              }}
          />
          <div className={styles.current}>
            <table className={tableStyle.list_approval}>
              <thead className={tableStyle.list_thead}>
                <tr className={tableStyle.list_tr1}>
                  <td className={tableStyle.list_td2}>이름</td>
                  <td>부서</td>
                  <td>결재 순서</td>
                  <td><RemoveCircleOutlineIcon className={styles.alert}/></td>
                </tr>
              </thead>
              <tbody>
                {
                    (approvalList.length !== 0) &&
                    approvalList.map((value, index) =>
                        <tr key={index} className={`${styles.center} ${tableStyle.list_tr}`}>
                            <td className={tableStyle.list_td2}>{value.text}</td>
                            <td>{value.data.rank}</td>
                            <td>{index+1}</td>
                            <td><RemoveCircleOutlineIcon onClick={() => handleClick(index)} className={styles.alert}/></td>
                        </tr>
                  )
                }
              </tbody>
            </table>
            { approvalList.length === 0 ? <div className={styles.center}>결재선을 추가해주세요</div> : ''}
          </div>
        </div>
  );
}


export default ApprovalTreeView;