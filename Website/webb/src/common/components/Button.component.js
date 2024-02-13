import { AwesomeButtonProgress } from 'react-awesome-button';

const Button = ({title, onPressIn}) => {
    return (
        <AwesomeButtonProgress type="secondary"
            onPress={async (element, next)=>{

                onPressIn();
                next();
              }}>
                
            {title}
        </AwesomeButtonProgress>
    );
}

export default Button;