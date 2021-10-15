import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postSignInAsync } from 'features/Login/loginSlice';

//Schema validation use yup
const schema = yup.object().shape({
  account: yup
    .string()
    .required('Vui lập nhập tài khoản')
    .max(50, 'Tài khoản có tối đa 50 kí tự'),

  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
});

SignIn.propTypes = {
  onSubmit: PropTypes.func,
};

function SignIn(props) {
  //Use form of React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  //Handle submit form sign in
  const onSubmit = async (data) => {
    const informationAdmin = {
      taiKhoan: data.account,
      matKhau: data.password,
    };

    await dispatch(postSignInAsync(informationAdmin));
  };
  return (
    <div className="sign-in">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sign-in__input-group">
          <input
            {...register('account')}
            id="account"
            className={errors.account ? `sign-in__control invalid` : `sign-in__control`}
            type="text"
            placeholder="Tài khoản"
          ></input>
          {errors.account ? <i className="fa fa-info sign-in__icon"></i> : ''}
          {errors.account && <p className="sign-in__error">{errors.account.message}</p>}
        </div>

        <div className="sign-in__input-group">
          <input
            {...register('password')}
            id="password"
            className={errors.password ? `sign-in__control invalid` : `sign-in__control`}
            type="password"
            placeholder="Mật khẩu"
          ></input>
          {errors.password ? <i className="fa fa-info sign-in__icon"></i> : ''}
          {errors.password && <p className="sign-in__error">{errors.password.message}</p>}
        </div>

        <button className="sign-in__button" type="submit">
          Đăng Nhập
        </button>
      </form>
    </div>
  );
}

export default SignIn;
