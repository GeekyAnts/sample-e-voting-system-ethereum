import { Button, Center, Container, Heading, Text } from "native-base";
import { Link } from "react-router-dom";
import { Layout } from "../../components";

export function ErrorPage() {
  return (
    <Layout>
      <Center>
        <Heading color="white">
          {" "}
          <Text color="coolGray.300" mr="2" fontSize="4xl" bold>
            404
          </Text>{" "}
          Page Not Found
        </Heading>
        <Text fontSize="2xl" color="white" fontWeight="normal">
          Please check the url in the address bar and try again
        </Text>
        <Link to="/">
          <Button my="2" alignSelf="center">
            Go back Home
          </Button>
        </Link>
      </Center>
    </Layout>
  );
}
