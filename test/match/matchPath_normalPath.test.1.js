import matchPath from '../../modules/match/matchPath'

describe('modules/match/matchPath  matchNormalPath', ()=>{
  test(`'/a(/b)?' match '/a(/b)?'`, () => {
    expect(matchPath('/a', '/a')).toMatchObject({ match: true, matchStr: '/a' })
    expect(matchPath('/a', '/a/b')).toMatchObject({ match: false })
    expect(matchPath('/a/b', '/a')).toMatchObject({ match: true, matchStr: '/a' })
    expect(matchPath('/a/b', '/b')).toMatchObject({ match: false })
    expect(matchPath('/a/b', '/a/b')).toMatchObject({ match: true, matchStr: '/a/b' })
  })
  
  test(`'/a(/b)?' match '/a(/b)?>'`, () => {
    expect(matchPath('/a', '/a>')).toMatchObject({ match: true, matchStr: '/a' })
    expect(matchPath('/a/b', '/a>')).toMatchObject({ match: false })
    expect(matchPath('/a/b', '/b>')).toMatchObject({ match: false })
    expect(matchPath('/a/b', '/a/b>')).toMatchObject({ match: true, matchStr: '/a/b' })
  })
})
