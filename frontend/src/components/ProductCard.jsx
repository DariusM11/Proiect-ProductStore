import { Box, Image, Text, Heading, HStack, IconButton, VStack, Input, Button } from '@chakra-ui/react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React from 'react'
import { useProductStore } from '../store/product.js';
import { toaster } from "./ui/toaster.jsx";
import { useState } from 'react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

export const ProductCard = ({product}) => {

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = { base: "gray.600", _dark: "gray.200" };
    const bg = { base: "white", _dark: "gray.800" };

    const {deleteProduct, updateProduct} = useProductStore();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        toaster.create({
            title: success ? "Success" : "Error",
            description: success ? "Product deleted successfully" : message,
            type: success ? "success" : "error",
            duration: 3000,
        });
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        toaster.create({
            title: success ? "Success" : "Error",
            description: success ? "Product updated successfully" : message,
            type: success ? "success" : "error",
            duration: 3000,
        });
    };

    return (
        <Box
        shadow = 'lg'
        rounded = 'lg'
        overflow = 'hidden'
        transition = 'all 0.3s'
        bg={bg}
        _hover = {{transform: "translateY(-5px)", shadow:'xl'}}>
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack>
                    <DialogRoot placement="center">
                        <DialogTrigger asChild>
                            <IconButton aria-label="Edit Product" colorPalette="blue" variant="ghost">
                                <FaEdit />
                            </IconButton>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Product</DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                <VStack gap={4}>
                                    <Input 
                                        placeholder='Product Name' 
                                        value={updatedProduct.name}
                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                    />
                                    <Input 
                                        placeholder='Price' 
                                        type='number' 
                                        value={updatedProduct.price}
                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                    />
                                    <Input 
                                        placeholder='Image URL' 
                                        value={updatedProduct.image}
                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                    />
                                </VStack>
                            </DialogBody>
                            <DialogFooter>
                                <DialogActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogActionTrigger>
                                <DialogActionTrigger asChild>
                                    <Button 
                                        colorPalette="blue" 
                                        onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                                    >
                                        Update
                                    </Button>
                                </DialogActionTrigger>
                            </DialogFooter>
                            <DialogCloseTrigger />
                        </DialogContent>
                    </DialogRoot>
                    <IconButton aria-label="Edit Product" onClick={() => handleDeleteProduct(product._id)} colorPalette="red" variant="ghost">
                        <MdDelete />
                    </IconButton>
                </HStack>

            </Box>
        </Box>
    )
    }
