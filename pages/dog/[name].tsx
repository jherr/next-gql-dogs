import React from "react";
import { dehydrate, useQuery } from "react-query";
import { Grid, Text, Button, Title, Image } from "@mantine/core";

import { queryClient, dogByName } from "../../src/api";

export async function getServerSideProps({ params }) {
  await queryClient.prefetchQuery(["dog"], () =>
    dogByName({ name: params.name })
  );

  return {
    props: {
      name: params.name,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const DogDetail: React.FunctionComponent<{
  name: string;
}> = ({ name }) => {
  const { data } = useQuery(["dog"], () => dogByName({ name }));

  if (!data.dog) {
    return <div>No dog found</div>;
  }

  return (
    <Grid>
      <Grid.Col xs={12} md={6} lg={4}>
        <Image src={data.dog.image} alt={data.dog.name} />
      </Grid.Col>
      <Grid.Col xs={12} md={6} lg={4}>
        <Title order={1}>{data.dog.name}</Title>

        <Grid mt={10}>
          <Grid.Col span={4}>
            <Title order={5}>Age</Title>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text>{data.dog.ageInWeeks} weeks</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={5}>Breed</Title>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text>{data.dog.breed}</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={5}>Sex</Title>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text>{data.dog.sex}</Text>
          </Grid.Col>
          {data.dog.color && (
            <>
              <Grid.Col span={4}>
                <Title order={5}>Color</Title>
              </Grid.Col>
              <Grid.Col span={8}>
                <Text>{data.dog.color}</Text>
              </Grid.Col>
            </>
          )}
        </Grid>
      </Grid.Col>

      <Grid.Col xs={12} md={6} lg={4}>
        <Button fullWidth>Adopt {data.dog.name}</Button>
      </Grid.Col>
    </Grid>
  );
};

export default DogDetail;
