// @ts-check

const { MongoClient } = require('mongodb')

const uri =
  'mongodb+srv://test:test@cluster0.zakxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function main() {
  await client.connect()

  const users = client.db('dbName').collection('users')
  const cities = client.db('dbName').collection('cities')

  // 삭제 {} => 전체 삭제
  await users.deleteMany({})
  await cities.deleteMany({})

  await cities.insertMany([
    {
      name: '서울',
      population: 1000,
    },
    {
      name: '전주',
      population: 60,
    },
    {
      name: '부산',
      population: 350,
    },
  ])

  // insert
  await users.insertMany([
    {
      name: 'Foo',
      year: 2000,
      contacts: [
        {
          type: 'phone',
          number: '+821012344321',
        },
        {
          type: 'home',
          number: '+820631234567',
        },
      ],
      city: '서울',
    },
    {
      name: 'Bar',
      year: 2002,
      city: '부산',
    },
    {
      name: 'Baz',
      year: 1996,
      city: '전주',
    },
    {
      name: 'Baz',
      year: 2003,
      city: '서울',
    },
  ])

  // 업데이트
  await users.updateOne(
    {
      // 변경 할 값
      name: 'Baz',
    },
    {
      // 변경 될 값
      $set: {
        name: 'Boo',
      },
    }
  )

  // 삭제
  await users.deleteOne({
    name: 'Baz',
  })

  // select
  const cursor = users.find(
    {
      year: {
        // >
        $gte: 1990,
      },
    },
    {
      sort: {
        year: 1, // -1: 내림차순 1: 오름차순
      },
    }
  )
  // await cursor.forEach(console.log)

  const cursor2 = users.find({
    'contacts.type': 'home',
  })
  // await cursor2.forEach(console.log)

  // JOIN
  const cursor3 = users.aggregate([
    {
      $lookup: {
        from: 'cities',
        localField: 'city',
        foreignField: 'name',
        as: 'city_info',
      },
    },
    {
      // 조건 검색
      // $match: {
      //   'city_info.population': {
      //     $gte: 500,
      //   },
      $match: {
        $and: [
          {
            'city_info.population': {
              $gte: 500,
            },
          },
          {
            year: {
              $gte: 1990,
            },
          },
        ],
      },
    },
    {
      $count: 'num_users',
    },
  ])
  await cursor3.forEach(console.log)

  await client.close()
}

main()
