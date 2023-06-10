import React from "react";
//UI
import { Modal, Spin, Table, Input, Select, Pagination } from "antd";
import { AiFillPlusCircle, AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../../../index.css";

const ModalSearchPatient = ({
  open,
  setOpen,
  patients,
  status,
  setParamsSearchPatient,
}) => {
  // Utils
  const navigate = useNavigate();

  // UI
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
    {
      title: "Identity Number",
      dataIndex: "identity_number",
      key: "identity_number",
      render: (text) => <p className="text-gray-700">{text ? text : "-"}</p>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
    {
      title: "Action",
      dataIndex: "Visitations",
      key: "Visitations",
      render: (_, { id_patient, Visitations }) =>
        Visitations.length !== 0 && Visitations[0].status !== "Selesai" ? (
          <AiFillCheckCircle className="text-2xl text-blue-700 cursor-pointer" />
        ) : (
          <AiFillPlusCircle
            className="text-2xl hover:text-blue-700 cursor-pointer"
            onClick={() =>
              navigate("/visitation/add", {
                state: {
                  id: id_patient,
                },
              })
            }
          />
        ),
    },
  ];

  return (
    <div>
      {/* Modal */}
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={900}
        bodyStyle={{
          height: 520,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          overflowY: "hidden",
        }}
        footer={null}
      >
        <h3 className="text-2xl font-medium text-blue-900">Choose Patient</h3>
        <div className="mt-6 flex justify-start gap-2">
          <p className="self-center w-12">Search :</p>
          <Input
            style={{
              width: "35%",
            }}
            placeholder="Input data patient here.."
            size="large"
            spellCheck="false"
            onChange={(e) => setParamsSearchPatient(e.target.value)}
          />
        </div>

        <div className="mt-4 h-[400px] overflow-y-scroll">
          {status === "success" ? (
            <div>
              <Table
                columns={columns}
                dataSource={patients}
                pagination={true}
              />
            </div>
          ) : (
            <div>
              <Spin tip="Loading" size="large" className="mt-40">
                <div className="content" />
              </Spin>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ModalSearchPatient;
