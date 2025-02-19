import ContainerInformation from "@features/list-detail/ContainerInformation";

const DUMMY_USERS = [
  {
    id: 1,
    name: "Alice",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Bob",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Charlie",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Dave",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Eve",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 6,
    name: "Frank",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 7,
    name: "Grace",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    id: 8,
    name: "Hank",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: 9,
    name: "Ivy",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    id: 10,
    name: "Jack",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: 11,
    name: "Kate",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    id: 12,
    name: "Leo",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 13,
    name: "Mia",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    id: 14,
    name: "Noah",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    id: 15,
    name: "Olivia",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    id: 16,
    name: "Paul",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
  },
  {
    id: 17,
    name: "Quinn",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    id: 18,
    name: "Ryan",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    id: 19,
    name: "Sophia",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
  },
  {
    id: 20,
    name: "Tom",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
  },
];

export default function Home() {
  return (
    <ContainerInformation
      maxCount={20}
      userImages={DUMMY_USERS.map((user) => ({
        id: user.id,
        image: user.image,
      }))}
    />
  );
}
