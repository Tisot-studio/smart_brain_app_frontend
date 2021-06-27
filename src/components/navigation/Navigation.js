const Navigation = ({onRouteChange}) => {
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p 
           onClick={() => onRouteChange('signin')} className='f4 link dim white pa3 pointer'> Выйти </p>
        </nav>
    )
}



export default Navigation;