import { returnZero } from './numbers.service'

describe('Number Service', () => {
  describe('#returnZero', () => {
    it('Returns zero.', () => {
      expect(
        returnZero()
      ).to.equal(0)
    })
  })
})
