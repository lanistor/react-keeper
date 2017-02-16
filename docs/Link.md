# Link
## Features
  * Support ***all properties*** that normal component can use.
  * Support ***custom tag*** of `Link` component (default tag is `a`).
  * Support ***custom*** children, ***tag*** children.
  * ***React Native*** compatible.
  * Fit for more flexible use scences.
## Reserved properties
  * to  
    The path linked to.  
    
    ```
    <Link to={ pathname + '/overview' }>Overview</Link>
    ```
    
  * type  
    The tag to render, default 'a'.  
    
    ```
    <Link type='img' src='http://localhost/favicon.ico' className='button' to={ '/overview' }/>
    ```  
    
    This will render to:  
    
    ```
    <img src='http://localhost/favicon.ico' class='button' />
    ```  
    
  * children  
    Support ***custom*** children, ***element*** children.  
    * Custom children  

      ```javascript
      <Link type='li' className='button' to={ pathname + '/overview' } >
        <a style={{ color: 'red' }}>Overview</a>
      </Link>
      ```  

      This will render to:  
      ```javascript
      <li class='button'>
        <a style='color:red'>Overview</a>
      </li>
      ```  
    * Element children, which can support ***React Native***  
      ```javascript
      import CustomComponent from './CustomButton'

      <Link type={ CustomComponent } className='button' to={ pathname + '/overview' } >
        <a style={{ color: 'red' }}>Overview</a>
      </Link>
      ```
      This will render to:  
      ```javascript
      <CustomComponent class='button'>
        <a style='color:red'>Overview</a>
      </CustomComponent>
      ```
    * ***You can create more flexible use scences by `type` and `children`***.

  * activeClassName  
    The `activeClassName` will be added to the tag when `active`.  

    ```javascript
    <Link to={ pathname + '/overview' } className='button' activeClassName='active'>Overview</Link>
    ```  
  * activeStyle  
    The `activeStyle` will be added to the tag when `active`.

    ```javascript
    <Link to={ pathname + '/overview' } className='button' activeClassName='active' activeStyle={{ color: 'red' }}>Overview</Link>
    ```  
  * isActive  
    `isActive` is the active flag of the `Link` component, its's default value is computed by comparing the `pathname` with the value of `to`.  
    You can define your own compute rule with this property  
    ```javascript
      import { Control, Link } from 'react-keeper'

      <Link to={ pathname + '/overview' } isActive={ Control.path === pathname || Control.path === (pathname + '/overview') }>Overview</Link>
    ```  
    ```javascript
      import { Control, Link } from 'react-keeper'

      <Link to={ pathname + '/overview' } isActive={ ()=>{ return Control.path.indexOf(pathname) === 0 } }>Overview</Link>
    ```
