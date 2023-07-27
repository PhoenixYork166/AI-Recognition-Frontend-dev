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
                <p 
                    className={`${classes.navPara}`}
                    onClick={() => onRouteChange('signin')} 
                    
                >
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
                    <p 
                        className={`${classes.navPara}`}
                        onClick={() => onRouteChange('signin')} 
                    >
                        Sign In
                    </p>
                    {/* If 'Register' is clicked, nav to 'register' page */}
                    <p 
                        className={`${classes.navPara}`}
                        onClick={() => onRouteChange('register')} 
                    >
                        Register
                    </p>
                </nav>
            </div>
            )
    }
    
}

export default Navigation