import React from "react";
import PropTypes from "prop-types";
import { List, Button, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { UNFOLLOW_REQUEST } from "../reducers/user";

const FollowList = ({ header, data, onclickMore, loading }) => {
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    dispatch({
      type: UNFOLLOW_REQUEST,
      data: id,
    });
  };

  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button onClick={onclickMore} loading={loading}>
            더 보기
          </Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          {header === "팔로잉 목록" ? (
            <Card
              actions={[
                <StopOutlined key="stop" onClick={onCancel(item.id)} />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          ) : (
            <Card>
              <Card.Meta description={item.nickname} />
            </Card>
          )}
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onclickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FollowList;
