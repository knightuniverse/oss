import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function QFYSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  );
}

export { QFYSpinner };
