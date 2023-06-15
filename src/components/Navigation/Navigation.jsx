import React from 'react';

const Navigation = ( { onRouteChange, isSignedIn }) => {

        if (isSignedIn) {
            return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                {/* If 'Sign Out' is clicked, nav to 'signin' page */}
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>
                    Sign Out
                </p>
            </nav>
            )
        } else {
            return (
            <div>
                {/* If 'Signin' is clicked, nav to 'signin' page */}
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
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