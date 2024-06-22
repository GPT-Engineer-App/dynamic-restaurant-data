import { Box, Container, Heading, Text, VStack, HStack, Divider } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import restaurantData from "../data/restaurant.json";

const HomePage = () => {
  const { name, location, contact, openingHours, menu } = restaurantData;

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl">{name}</Heading>
          <Text fontSize="lg">{location.address}</Text>
        </Box>

        <HStack spacing={4} justify="center">
          <HStack>
            <FaMapMarkerAlt />
            <Text>{location.address}</Text>
          </HStack>
          <HStack>
            <FaPhone />
            <Text>{contact.phone}</Text>
          </HStack>
          <HStack>
            <FaEnvelope />
            <Text>{contact.email}</Text>
          </HStack>
        </HStack>

        <Box>
          <Heading as="h2" size="lg">Opening Hours</Heading>
          <VStack align="start">
            {Object.entries(openingHours).map(([day, hours]) => (
              <HStack key={day}>
                <FaClock />
                <Text>{day.charAt(0).toUpperCase() + day.slice(1)}: {hours}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="lg">Menu</Heading>
          {menu.map((category) => (
            <Box key={category.category} mt={4}>
              <Heading as="h3" size="md">{category.category}</Heading>
              <Divider my={2} />
              {category.items.map((item) => (
                <Box key={item.name} mb={2}>
                  <Text fontWeight="bold">{item.name} - ${item.price.toFixed(2)}</Text>
                  <Text>{item.description}</Text>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default HomePage;