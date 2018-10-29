import matchPath from '../../modules/match/matchPath'

describe('modules/match/matchPath  paramPath', ()=>{

  test(`'/item/123' match '/item/:id`, () => {
    expect(matchPath('/item/123', '/item/:id')).toMatchObject({ match: true, params: { id: '123' }, matchStr: '/item/123' })
  })

  test(`'/item/123/abc' match '/item/:id/:name`, () => {
    expect(matchPath('/item/123/abc', '/item/:id/:name')).toMatchObject({ match: true, params: { id: '123', name: 'abc' }, matchStr: '/item/123/abc' })
  })

  test(`'/item/123/abc' match '/item/:id`, () => {
    expect(matchPath('/item/123/abc', '/item/:id')).toMatchObject({ match: true, params: { id: '123' }, matchStr: '/item/123' })
  })

  test(`'/item/123/abc' match '/item/:id`, () => {
    expect(matchPath('/item/123/abc', '/item')).toMatchObject({ match: true, params: { }, matchStr: '/item' })
  })
})
