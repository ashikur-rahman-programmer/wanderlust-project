"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
// import { revalidatePath } from "next/cache";

import { FiEdit } from "react-icons/fi";

export function EditModal({ destination }) {
  const {
    _id,
    imageUrl,
    price,
    destinationName,
    duration,
    country,
    description,
    category,
    departureDate,
  } = destination;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    const res = await fetch(`http://localhost:5000/destination/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await res.json();

    // revalidatePath(`/destinations/${_id}`);

    return data;
  };

  return (
    <Modal>
      <Modal.Trigger>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition">
          <FiEdit /> Edit
        </button>
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          {" "}
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger className="absolute right-4 top-4" />

            <Modal.Header>
              <Modal.Heading className="text-xl font-bold">
                Edit Destination
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-0">
              {" "}
              <Surface variant="default">
                <form onSubmit={onSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Destination Name */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={destinationName}
                        name="destinationName"
                        isRequired
                      >
                        <Label>Destination Name</Label>
                        <Input
                          placeholder="Bali Paradise"
                          className="rounded-xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Country & Category */}
                    <TextField defaultValue={country} name="country" isRequired>
                      <Label>Country</Label>
                      <Input placeholder="Indonesia" className="rounded-xl" />
                      <FieldError />
                    </TextField>

                    <div>
                      <Select
                        defaultValue={[category]}
                        name="category"
                        isRequired
                      >
                        <Label>Category</Label>
                        <Select.Trigger className="rounded-xl">
                          <Select.Value />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="Beach">Beach</ListBox.Item>
                            <ListBox.Item id="Mountain">Mountain</ListBox.Item>
                            <ListBox.Item id="City">City</ListBox.Item>
                            <ListBox.Item id="Adventure">
                              Adventure
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Price & Duration */}
                    <TextField
                      defaultValue={price}
                      name="price"
                      type="number"
                      isRequired
                    >
                      <Label>Price (USD)</Label>
                      <Input type="number" className="rounded-xl" />
                      <FieldError />
                    </TextField>

                    <TextField
                      defaultValue={duration}
                      name="duration"
                      isRequired
                    >
                      <Label>Duration</Label>
                      <Input className="rounded-xl" />
                      <FieldError />
                    </TextField>

                    {/* Departure Date & Image URL */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={departureDate}
                        name="departureDate"
                        type="date"
                        isRequired
                      >
                        <Label>Departure Date</Label>
                        <Input type="date" className="rounded-xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={imageUrl}
                        name="imageUrl"
                        isRequired
                      >
                        <Label>Image URL</Label>
                        <Input type="url" className="rounded-xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={description}
                        name="description"
                        isRequired
                      >
                        <Label>Description</Label>
                        <TextArea className="rounded-2xl" rows={4} />
                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  <Modal.Footer className="px-0 pt-4">
                    <Button
                      type="submit"
                      className="bg-cyan-500 text-white font-bold w-full md:w-auto"
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
