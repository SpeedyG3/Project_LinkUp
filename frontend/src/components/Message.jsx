import { Avatar, Flex, Text } from '@chakra-ui/react'

const Message = ({ ownMessage }) => {
    return (
        <>
            {ownMessage ? (
                <Flex gap={2}
                    alignSelf={"flex-end"}>
                    <Text maxW={"350px"}
                        bg={"blue.400"}
                        p={1} borderRadius={"md"}
                    >
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam dolores voluptates debitis nobis. Nam dicta hic, non dolore odio iure, quia culpa, consequatur veritatis magni eligendi totam numquam? Reiciendis, eius.
                        Officiis dolor voluptates accusantium neque a vero aspernatur ratione possimus asperiores nam aliquid laboriosam eum, perferendis inventore alias autem ab nihil at aperiam eligendi voluptatem velit sapiente temporibus magnam? Harum!
                    </Text>
                    <Avatar src='' w={"7"}
                        h={"7"} />
                </Flex>)
                : (
                    <Flex gap={2}>
                        <Avatar src='' w={"7"}
                            h={"7"} />
                        <Text maxW={"350px"}
                            bg={"gray.400"}
                            p={1} borderRadius={"md"}
                        color={"black"}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam dolores voluptates debitis nobis. Nam dicta hic, non dolore odio iure, quia culpa, consequatur veritatis magni eligendi totam numquam? Reiciendis, eius.
                            Officiis dolor voluptates accusantium neque a vero aspernatur ratione possimus asperiores nam aliquid laboriosam eum, perferendis inventore alias autem ab nihil at aperiam eligendi voluptatem velit sapiente temporibus magnam? Harum!
                        </Text>

                    </Flex>
                )}

        </>
    )
}

export default Message