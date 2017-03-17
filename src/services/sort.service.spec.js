import { sortDescending } from './sort.service'

describe('Sort Service', () => {
  describe('#sortDescending', () => {
    it('Sorts an array of integers in descending order.', () => {
      expect(
        sortDescending([2, 3, 1])
      ).to.eql([3, 2, 1])
    })
  })
})

