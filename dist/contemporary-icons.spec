Name:           contemporary-icons
Version:        1.9
Release:        1%{?dist}
Summary:        Icon Theme

License:        CC-BY-SA-4.0
URL:            https://github.com/vicr123/contemporary-icons
Source0:        https://github.com/vicr123/contemporary-icons/archive/v%{version}.tar.gz

%define debug_package %{nil}
%define _unpackaged_files_terminate_build 0

%description
Icon Theme

%prep
%setup

%install
mkdir -p $RPM_BUILD_ROOT/%{_datadir}/icons/contemporary
cp -r * $RPM_BUILD_ROOT/%{_datadir}/icons/contemporary


%files
%{_datadir}/icons/contemporary/*

%changelog
* Sun May  3 2020 Victor Tran
- 
