import { faker } from '@faker-js/faker'
import { TestOrderProps } from '@/Types'

export function generateOrderData(count: number): TestOrderProps[] {
    return range(count).map((): TestOrderProps => {
        return {
            ...newTestOrder()
        }
    })
}

const range = (count: number) => {
    const arr = []
    for (let i = 0; i < count; i++) {
        arr.push(i)
    }
    return arr
}

const testOrdered = (count: number): string[] => {
    const testOrdered: string[] = ['Hematology']

    for (let i = 0; i < count; i++) {
        const testName: string = faker.science.chemicalElement().name
        if (!testOrdered.includes(testName)) {
            testOrdered.push(testName)
        }
    }

    return testOrdered
}

const newTestOrder = (): TestOrderProps => {
    return ({
        registrationID: faker.string.numeric(11),
        patientName: `${faker.person.firstName()} ${faker.person.lastName()}`,
        payment: faker.helpers.arrayElement(['BPJS', 'Self-Payment', 'Insurance']),
        referringPhysician: `Dr. ${faker.person.firstName()} ${faker.person.lastName()}`,
        dateTime: faker.date.past(),
        test: testOrdered(faker.number.int(8)),
    })
}
