import React, { useEffect } from 'react'
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useProductStore } from '../store/product.js'
import { ProductCard } from '../components/ProductCard.jsx'

const HomePage = () => {

  const {fetchProducts, products} = useProductStore();
  useEffect( () => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products: ", products);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip="text"
          color="transparent" 
        >
            Current Products
        </Text>

        <SimpleGrid columns={{
          base:1,
          md: 2,
          lg: 3
        }}
          spacing={10}
          w={("full")}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>



        {products.length === 0 && <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
          No products found {" "}
          <RouterLink to={"/create"}>
            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline", color: "blue.600"}} cursor="pointer">
              Create a Product
            </Text>
          </RouterLink>
        </Text>}
      </VStack>
    </Container>
  )
}

export default HomePage