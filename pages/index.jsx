import { Box, Container, Heading, Text, VStack, HStack, SimpleGrid, GridItem } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";

const Index = () => {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    fetch("/data/restaurant.json")
      .then((response) => response.json())
      .then((data) => setRestaurantData(data));
  }, []);

  if (!restaurantData) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Welcome to Flavor Town</Heading>
        <Box>
          <Heading as="h2" size="lg">Location</Heading>
          <HStack spacing={4} mt={2}>
            <FaMapMarkerAlt />
            <Text>{restaurantData.location.address}</Text>
          </HStack>
        </Box>
        <Box>
          <Heading as="h2" size="lg">Menu</Heading>
          <SimpleGrid columns={[1, null, 2]} spacing={10} mt={4}>
            {restaurantData.products.map((product, index) => (
              <GridItem key={index} p={5} shadow="md" borderWidth="1px">
                <Heading as="h3" size="md">{product.name}</Heading>
                <Text mt={2}>{product.description}</Text>
                <Text mt={2} fontWeight="bold">${product.price.toFixed(2)}</Text>
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>
        <Box>
          <Heading as="h2" size="lg">Opening Hours</Heading>
          <VStack spacing={2} mt={2}>
            {Object.entries(restaurantData.openingHours).map(([day, hours], index) => (
              <Text key={index}>{day.charAt(0).toUpperCase() + day.slice(1)}: {hours}</Text>
            ))}
          </VStack>
        </Box>
        <Box>
          <Heading as="h2" size="lg">Contact Us</Heading>
          <VStack spacing={2} mt={2}>
            <HStack>
              <FaPhone />
              <Text>{restaurantData.contactDetails.phone}</Text>
            </HStack>
            <HStack>
              <FaEnvelope />
              <Text>{restaurantData.contactDetails.email}</Text>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;