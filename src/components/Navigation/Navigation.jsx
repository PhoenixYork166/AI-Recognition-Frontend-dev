import classes from './Navigation.module.css';
import React from 'react';

const Navigation = ( { onRouteChange, isSignedIn }) => {

        if (isSignedIn) {
            return (
            <nav 
                className={`${classes.navSignedIn}`}
                // style={{display: 'flex', justifyContent: 'flex-end', width: '95%', position: 'absolute' }}
            >
                {/* If 'Sign Out' is clicked, nav to 'signin' page */}
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>
                    Sign Out
                </p>
            </nav>
            )
        } else {
            return (
            <div className={`${classes.navBoxSignedOut}`}>
                {/* If 'Signin' is clicked, nav to 'signin' page */}
                <nav
                    className={`${classes.navSignedOut}`} 
                    // style={{display: 'flex', justifyContent: 'flex-end'}}
                >
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>
                        Sign In
                    </p>
                    {/* If 'Register' is clicked, nav to 'register' page */}
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>
                        Register
                    </p>
                </nav>
            </div>
            )
    }
    
}

export default Navigation