import React, { useEffect, useState } from "react";
import { useProductStore } from "../../app/productStore";
import {
  Card,
  Col,
  Row,
  Spin,
  Alert,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  notification,
} from "antd";
import "antd/dist/reset.css";

const Products: React.FC = () => {
  const { loading, products, error, fetchProducts, addProduct, editProduct, deleteProduct } =
    useProductStore() as {
      loading: boolean;
      products: {
        id: number;
        title: string;
        images: string;
        price: number;
      }[];
      error: string | null;
      fetchProducts: () => void;
      addProduct: (product: { title: string; images: string; price: number }) => Promise<void>;
      editProduct: (product: { id: number; title: string; images: string; price: number }) => Promise<void>;
      deleteProduct: (id: number) => Promise<void>;
    };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [currentProduct, setCurrentProduct] = useState<{
    id: number;
    title: string;
    images: string;
    price: number;
  } | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = (product: {
    id: number;
    title: string;
    images: string;
    price: number;
  }) => {
    setCurrentProduct(product);
    form.setFieldsValue(product);
    setIsEditModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (typeof addProduct === "function") {
        await addProduct(values);
        form.resetFields();
        setIsModalOpen(false);
        notification.success({
          message: "Product Added",
          description: "The product has been successfully added.",
        });
        fetchProducts();
      } else {
        console.error("addProduct is not a function");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      notification.error({
        message: "Error",
        description: "Failed to add the product. Please try again.",
      });
    }
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      if (typeof editProduct === "function" && currentProduct) {
        await editProduct({ ...currentProduct, ...values });
        form.resetFields();
        setIsEditModalOpen(false);
        setCurrentProduct(null);
        notification.success({
          message: "Product Updated",
          description: "The product has been successfully updated.",
        });
        fetchProducts();
      } else {
        console.error("editProduct is not a function");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      notification.error({
        message: "Error",
        description: "Failed to update the product. Please try again.",
      });
    }
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setCurrentProduct(null);
  };

  const handleDelete = async (id: number) => {
    try {
      if (typeof deleteProduct === "function") {
        await deleteProduct(id);
        notification.success({
          message: "Product Deleted",
          description: "The product has been successfully deleted.",
        });
        fetchProducts();
      } else {
        console.error("deleteProduct is not a function");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      notification.error({
        message: "Error",
        description: "Failed to delete the product. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: "block", margin: "auto", marginTop: "20px" }}
      />
    );
  }

  if (error) {
    return (
      <Alert
        message={error}
        type="error"
        showIcon
        style={{ marginTop: "20px" }}
      />
    );
  }

  return (
    <div style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
      <h1
        style={{ marginBottom: "24px", fontSize: "24px", fontWeight: "bold" }}
      >
        Products
      </h1>

      <Button
        type="primary"
        onClick={showModal}
        style={{ marginBottom: "24px" }}
      >
        Add New Product
      </Button>

      {products.length > 0 ? (
        <Row gutter={16}>
          {products.map((product) => (
            <Col span={8} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.title}
                    src={product.images}
                    style={{
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                }
                style={{ marginBottom: "16px" }}
                actions={[
                  <Button type="link" onClick={() => showEditModal(product)}>Edit</Button>,
                  <Button type="link" onClick={() => handleDelete(product.id)}>Delete</Button>
                ]}
              >
                <Card.Meta
                  title={product.title}
                  description={`Price: ${product.price}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <h2>No products available</h2>
      )}

      <Modal
        title="Add New Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="add_product_form">
          <Form.Item
            name="title"
            label="Product Title"
            rules={[
              { required: true, message: "Please input the product title!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="images"
            label="Image URL"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Product"
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="edit_product_form">
          <Form.Item
            name="title"
            label="Product Title"
            rules={[
              { required: true, message: "Please input the product title!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="images"
            label="Image URL"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
